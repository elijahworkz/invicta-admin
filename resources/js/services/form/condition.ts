import { computed } from 'vue'
import { useResourceForm } from '@/services/form'
import get from 'lodash/get'
import isString from 'lodash/isString'
import { IFormField } from '@/interfaces'

const resourceForm = useResourceForm()

export const useFieldCondition = (field: IFormField) => {

    return computed(() => {
        let condition = get(field, 'if', null)

        if (! condition)
            return true
        
        let target = resourceForm.get(condition.id)

        if (! target)
            return true

        let operator = prepareOperator(condition.operator)
        let loperand = prepareOperand(target, operator)
        let roperand = prepareOperand(condition.value, operator)

        if (operator == 'includes') {
            return passesIncludesCondition(loperand, roperand)
        }

        let expression = `${loperand} ${operator} ${roperand}`

        console.log('condition expression', expression)

        return eval(expression)
    })
}

function passesIncludesCondition(target: any, search: any) {
    return target.includes(search)
}

function prepareOperand(operand: any, operator: string) {

    if (['>', '>=', '<', '<='].includes(operator)) {
        return Number(operand)
    }

    return isString(operand)
        ? JSON.stringify(operand.trim())
        : operand
}

function prepareOperator(operator: string) {
    switch (operator) {
        case '==':
        case 'equal':
        case 'equals':
        case 'is':
            return '=='
        case 'not equals':
        case 'not equal':
            return '!=='
        case '>':
        case 'more':
        case 'more than':
            return '>'
        case '>=':
        case 'more or equal':
        case 'more or equals':
            return '>='
        case '<':
        case 'less':
        case 'less than':
            return '<'
        case '<=':
        case 'less or equal':
        case 'less or equals':
            return '<='
        case 'includes':
        case 'contains':
            return 'includes'
    }
    return operator
}
// import { useResourceForm } from '@/services/form'
// import get from 'lodash/get'
// import isString from 'lodash/isString'


export const useFieldCondition = (field, formId) => {

    return computed(() => {

        let condition = get(field, 'if', null) || get(field, 'if_any', null) || get(field, 'if_all', null)

        if (! condition)
            return true

        if (Array.isArray(condition)) {

            if ('if_all' in field) {
                let allResult = condition.every((item) => {
                    return processCondition(formId, item)
                })

                return allResult
            }

            if ('if_any' in field) {
                
                let anyResult = false

                condition.forEach((item) => {
                    let result = processCondition(formId, item)

                    if (result) {
                        anyResult = true
                    }
                })

                return anyResult
            }
        }

        return processCondition(formId, condition)
    })
}

function processCondition(formId, condition) {

    const resourceForm = useResourceForm(formId)

    let target = resourceForm.get(condition.id)

    console.log('target', target, condition.id);

    // if (! target)
    //     return true

    let operator = prepareOperator(condition.operator)
    let loperand = prepareOperand(target, operator)
    let roperand = prepareOperand(condition.value, operator)

    if (operator == 'in' || operator == 'not in') {
        return passesIncludesCondition(roperand, loperand, ! operator.includes('not'))
    }

    let expression = `${loperand} ${operator} ${roperand}`

    console.log('condition expression', expression)

    return eval(expression)
}

function passesIncludesCondition(source, search, included) {
    const isIncluded = source.includes(search)
    console.log(`is ${search} includes in ${source}: ${isIncluded}`);
    console.log(`included: ${included}`);
    return included ? isIncluded : ! isIncluded
}

function prepareOperand(operand, operator) {

    if (['>', '>=', '<', '<='].includes(operator)) {
        return Number(operand)
    }

    return isString(operand)
        ? JSON.stringify(operand.trim())
        : operand
}

function prepareOperator(operator) {
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
        default:
            return operator
    }
    return operator
}
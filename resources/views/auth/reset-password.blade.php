@extends('invicta::layouts.auth')

@section('content')
    <div class="auth-form">
        <h1 class="auth-header">{{ config('app.name') }}</h1>
        <div class="el-card is-always-shadow auth-card">
            <div class="el-card__body">
                <form class="el-form el-form--default el-form--label-top" method="post" action="{{ $actionUrl }}">
                    @csrf()
                    <input type="hidden" name="token" value="{{ request()->route('token') }}">
                    <div class="el-form-item">
                        <label for="email" class="el-form-item__label">Email</label>
                        <div class="el-input">
                            <div class="el-input__wrapper">
                                <input class="el-input__inner" type="text" name="email" value="{{ request()->email }}" autocomplete="username" id="email">
                                @if($errors->has('email'))
                                    <div class="el-form-item__error">{{ $errors->first('email') }}</div>
                                @endif
                            </div>
                        </div>
                    </div>
                    <div class="el-form-item">
                        <label for="password" class="el-form-item__label">Password</label>
                        <div class="el-input">
                            <div class="el-input__wrapper">
                                <input class="el-input__inner" type="password" name="password" id="password">
                                @if($errors->has('password'))
                                    <div class="el-form-item__error">{{ $errors->first('password') }}</div>
                                @endif
                            </div>
                        </div>
                    </div>
                    <div class="el-form-item">
                        <label for="password_confirmation" class="el-form-item__label">Confirm Password</label>
                        <div class="el-input">
                            <div class="el-input__wrapper">
                                <input class="el-input__inner" type="password" name="password_confirmation" id="password_confirmation">
                            </div>
                        </div>
                    </div>
                    <div class="el-form-item text-center">
                        <button class="el-button el-button--primary" aria-disabled="false" type="submit">
                            <span>Reset Password</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection
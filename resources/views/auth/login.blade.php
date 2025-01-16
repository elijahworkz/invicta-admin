@extends('invicta::layouts.auth')

@section('content')
    <div class="auth-form">
        <h1 class="auth-header">{{ config('app.name') }}</h1>
        <div class="el-card is-always-shadow auth-card">
            <div class="el-card__body">
                @if (! empty(session('message')))
                    <div class="mb-2">
                        <div class="el-alert el-alert--success is-light" role="alert">
                            <div class="el-alert__content">
                                <span class="el-alert__title">{{ session('message') }}</span>
                            </div>
                        </div>
                    </div>
                @endif
                <form class="el-form el-form--default el-form--label-top" method="post" action="{{ $actionUrl }}">
                    @csrf()
                    <div class="el-form-item">
                        <label for="email" class="el-form-item__label">Email</label>
                        <div class="el-input">
                            <div class="el-input__wrapper">
                                <input id="email" class="el-input__inner" type="text" name="email" autocomplete="username">
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
                                    <input class="el-input__inner" type="password" name="password" autocomplete="current-password" id="password">
                                </div>
                            </div>
                    </div>
                    <footer class="btn-row">
                        <label class="el-checkbox">
                            <span class="el-checkbox__input">
                                <input type="checkbox" name="remember" aria-hidden="false">
                            </span>
                            <span class="el-checkbox__label">Remember me</span>
                        </label>
                        <button class="el-button el-button--primary" aria-disabled="false" type="submit">
                            <span class="">Log in</span>
                        </button>
                    </footer>
                </form>
            </div>
        </div>
        @if ($resetUrl)
            <div class="text-center">
                <a href="{{ $resetUrl }}">Forgot your password?</a>
            </div>
        @endif
    </div>
@endsection
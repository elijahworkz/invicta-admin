@extends('invicta::layouts.auth')

@section('content')
    <div class="auth-form">
        <h1 class="auth-header">{{ config('app.name') }}</h1>
        <div class="el-card is-always-shadow auth-card">
            <div class="el-card__body">
                <header class="mb-6">
                    <div class="text-center mb-2 text-xl">Forgot Your Password?</div>
                    <p>Enter your email address so we can send a reset password link.</p>
                </header>

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
                        <label for="email" class="el-form-item__label">Email Address</label>
                        <div class="el-input">
                            <div class="el-input__wrapper">
                                <input class="el-input__inner" type="text" name="email" autocomplete="username" id="email">
                                @if($errors->has('email'))
                                    <div class="el-form-item__error">{{ $errors->first('email') }}</div>
                                @endif
                            </div>
                        </div>
                    </div>
                    <footer class="text-center">
                        <button class="el-button el-button--primary" aria-disabled="false" type="submit">
                            <span>Submit</span>
                        </button>
                    </footer>
                </form>
            </div>
        </div>
    </div>
@endsection
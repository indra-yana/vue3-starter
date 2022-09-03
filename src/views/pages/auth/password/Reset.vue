<template>
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card card-default">
                <div class="card-header bg-secondary bg-gradient border"><h4 class="text-white">Reset Password</h4></div>
                <div class="card-body bg-primary-soft">
                    <form @submit.prevent="resetPassword()" autocomplete="off">
                        <input type="hidden" name="token" v-model="form.token">
                        <div class="form-group row mb-3">
                            <label for="email" class="col-sm-4 col-form-label text-md-right">E-Mail Address <span class="text-danger">*</span></label>
                            <div class="col-md-6">
                                <input type="email" name="email" id="email" class="form-control" :class="{'is-invalid': validation.email}" v-model="form.email" @input="handleInput('email')" placeholder="Input Email" required readonly>
                                <div v-if="validation.email" class="invalid-feedback mt-1" >
                                    <ul class="mb-0 ps-3">
                                        <li v-for="(error, index) in validation.email">{{ error }}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row mb-3">
                            <label for="password" class="col-md-4 col-form-label text-md-right">Password <span class="text-danger">*</span></label>
                            <div class="col-md-6">
                                <input type="password" name="password" id="password" class="form-control" :class="{'is-invalid': validation.password}" placeholder="Input Password" v-model="form.password" @input="handleInput('password')" required>
                                <div v-if="validation.password" class="invalid-feedback mt-1" >
                                    <ul class="mb-0 ps-3">
                                        <li v-for="(error, index) in validation.password">{{ error }}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row mb-3">
                            <label for="password_confirmation" class="col-md-4 col-form-label text-md-right">Password Confirmation <span class="text-danger">*</span></label>
                            <div class="col-md-6">
                                <input type="password" name="password_confirmation" id="password_confirmation" class="form-control" :class="{'is-invalid': validation.password_confirmation}" placeholder="Retype Your Password" v-model="form.password_confirmation" @input="handleInput('password_confirmation')" required autocomplete="new-password">
                                <div v-if="validation.password_confirmation" class="invalid-feedback mt-1" >
                                    <ul class="mb-0 ps-3">
                                        <li v-for="(error, index) in validation.password_confirmation">{{ error }}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row mb-0">
                            <div class="col-md-8 offset-md-4">
                                <SubmitButton :class="['me-2']" :text="`${'Reset Password'}`" :processing="isProcessing"/>
                                <ResetButton :class="['me-2']" @click="resetForm()" :processing="isProcessing"/>
                                <router-link :to="{ name: 'home'}" class="btn btn-link text-lg-right">Home</router-link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { resetPassword } from '@src/api/auth';

    export default {
        data() {
            return {
                isProcessing: false,
                validation: {},
                form: {
                    token: this.$route.params.token,
                    email: this.$route.query.email,
                    password: "",
                    password_confirmation: "",
                }
            };
        },
        created() {
            // console.log(this.form);
        },
        methods: {
            async resetPassword() {
                this.isProcessing = true;
                this.validation = {};

                const { success, failure } = await resetPassword(this.form);

                if (success) {
                    const { message, data } = success;

                    this.$event.emit('flash-message', { message, type: "success", withToast: true });
                } else if (failure) {
                    const { message, error = {} } = failure;

                    this.validation = error;
                    this.$event.emit('flash-message', { message, type: "error", withToast: true });
                } else {
                    this.$event.emit('flash-message', { message: "An error occured :( unknown response.", type: "error" });
                }

                this.isProcessing = false;
            },
            resetForm() {
                this.isProcessing = false;
                this.validation = {};
                this.form.password = "";
                this.form.password_confirmation = "";
            },
            handleInput(inputName) {
                switch (inputName) {
                    case 'email':
                        this.validation.email = null;
                        break;
                    case 'password':
                        this.validation.password = null;
                        break;
                    case 'password_confirmation':
                        this.validation.password_confirmation = null;
                        break;
                    default:
                        break;
                }
            }
        },
    }
</script>
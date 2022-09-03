<template>
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card card-default">
                <div class="card-header bg-secondary bg-gradient border"><h4 class="text-white">Forgot Password</h4></div>
                <div class="card-body bg-primary-soft">
                    <form @submit.prevent="sendResetLink()">
                        <div class="form-group row mb-3">
                            <label for="email" class="col-sm-4 col-form-label text-md-right">E-Mail Address <span class="text-danger">*</span></label>
                            <div class="col-md-6">
                                <input type="email" name="email" id="email" class="form-control" :class="{'is-invalid': validation.email}" v-model="form.email" @input="handleInput('email')" placeholder="Input Email" required autofocus autocomplete="off" >
                                <div v-if="validation.email" class="invalid-feedback mt-1" >
                                    <ul class="mb-0 ps-3">
                                        <li v-for="(error, index) in validation.email">{{ error }}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row mb-0">
                            <div class="col-md-8 offset-md-4">
                                <SubmitButton :class="['me-2']" :text="`${'Send Password Reset Link'}`" :processing="isProcessing"/>
                                <router-link :to="{ name: 'login'}" class="btn btn-link text-lg-right">Back to login</router-link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { sendResetLink } from '@src/api/auth';

    export default {
        data() {
            return {
                isProcessing: false,
                validation: {},
                form: {
                    email: "",
                }
            };
        },
        created() {
            
        },
        methods: {
            async sendResetLink() {
                this.isProcessing = true,
                this.validation = {};

                const { success, failure } = await sendResetLink(this.form);

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
                this.form = {
                    email: "",
                }
            },
            handleInput(inputName) {
                switch (inputName) {
                    case 'email':
                        this.validation.email = null;
                        break;
                    default:
                        break;
                }
            }
        },
    }
</script>
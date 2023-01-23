class UsersController < ApplicationController
    # skip_before_action :verify_authenticity_token   #{Testing login response}
    def index
        users = User.all
        render json: users
    end
    def show
        user = User.find(params[:id])
        render json: user
    end
    def create  #{ Signup method}
        user = User.create(user_params)
        if user.valid?
            session[:user_id] = user.id\
            render json: user, status: :created
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end
    
    private

    def user_params
        params.permit(:username, :password, :password_confirmation)
    end
end

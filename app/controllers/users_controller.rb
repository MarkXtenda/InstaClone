class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :invalid_response
    # def index
        # if params[:username].length > 0
        #     users = User.where(username: params[:username])
        #     if users.length > 0
        #         render json: users
        #     else
        #         render json: { error: "User not found" }, status: :not_found
        #     end
        # elsif params[:username].length == 0
        #     users = User.all
        #     render json: users
        # end
    # end

    def index 
        users = User.all
        render json: users
    end

    def show
        user = User.find_by(id: params[:id])
        if user
            render json: user
        else
            render json: { error: "Not found" }, status: :not_found
        end
    end

    def update  #{ Update logged in method}
        user = User.find_by(id: session[:user_id])
        if user
            user.update(update_params)
            render json: user
        else
            render json: { error: "Not authorized" }, status: :unauthorized
        end
    end

    def create  #{ Signup method}
        user = User.create!(user_params)
        if user.valid?
            session[:user_id] = user.id
            render json: user, status: :created
        end
    end
    
    private

    def user_params
        params.permit(:id, :username, :password, :password_confirmation, :user)
    end

    def update_params
        params.permit(:avatar, :bio)
    end

    def invalid_response(user)
        render json: { errors: user.record.errors.full_messages }, status: :unprocessable_entity
    end
end

class SessionController < ApplicationController
    # skip_before_action :verify_authenticity_token   #{Testing login response}

    def create  #{ Login method}
        user = User.find_by(username: params[:username])
        if user&.authenticate(params[:password])    #{ Authentificate user }
            session[:user_id] = user.id #{ creating a session to keep a user logged in }
            render json: user, status: :created
        else
            render json: { errors: "Invalid username or password" }, status: :unauthorized
        end
    end

    def show
        user = User.find_by(id: session[:user_id])
        if user
            render json: user
        else
            render json: { error: "Not authorized" }, status: :unauthorized
        end
    end

    def destroy
        session.delete :user_id
        head :no_content
    end
end

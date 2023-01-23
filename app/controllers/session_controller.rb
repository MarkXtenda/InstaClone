class SessionController < ApplicationController
    skip_before_action :verify_authenticity_token   #{Testing login response}
    def create  #{ Login method}
        user = User.find_by(username: params[:username])
        if user&.authenticate(params[:password])    #{ Authentificate user }
            render json: user, status: :created
        else
            render json: { error: "Invalid username or password" }, status: :unauthorized
        end
    end
end

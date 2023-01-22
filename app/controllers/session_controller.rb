class SessionController < ApplicationController
    skip_before_action :verify_authenticity_token   #{Testing login response}
    def create
        user = User.find_by(username: params[:username])
        if user
            render json: user, status: :created
        else
            render json: { error: user.errors.full_messages }, status: :unauthorized
        end
    end
end

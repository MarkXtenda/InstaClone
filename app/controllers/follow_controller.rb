class FollowController < ApplicationController
    def create
        user = User.find_by(id: session[:user_id])
        if user
            user.followings.create!(follow_params)
            render json: user
        else
            render json: { error: "Not authorized" }, status: :unauthorized
        end
    end

    def update
        if params[:username].length > 0
            users = User.where(username: params[:username])
            if users.length > 0
                render json: users
            else
                render json: { error: "User not found" }, status: :not_found
            end
        elsif params[:username].length == 0
            users = User.all
            render json: users
        end
    end

    private 

    def follow_params
        params.permit(:follower_id, :followed_user_id)
    end
end

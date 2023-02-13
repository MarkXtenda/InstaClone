class FollowController < ApplicationController
    
    def show    #{ Feed method}
        user = User.find(session[:user_id]) #{ NOTE: add session[:user_id], instead of params[:id]}
        follows = user.followings
        followed_users = []
        follows.each{|index| followed_users.push(index.id)}
        feed_posts = Post.where(user_id: followed_users).order(id: :desc)
        render json: feed_posts.to_json(only: [:id, :image, :caption, :liked], include: [user: { only: [:id, :username, :avatar]}, users_likes: { only: :id}])
    end
    
    def index
        is_following_exist = Follow.where(follow_params).any?
        render json: is_following_exist
    end

    def create  #{ Following method }
        user = User.find(params[:follower_id])
        is_following_exist = Follow.where(follower_id: params[:follower_id], followed_user_id: params[:followed_user_id]).any?

        if user && !is_following_exist
            new_following = Follow.create(follower_id: params[:follower_id], followed_user_id: params[:followed_user_id])
            head :no_content, status: :created
        else
            existing_following = Follow.where(follower_id: params[:follower_id], followed_user_id: params[:followed_user_id])[0]
            render json: existing_following
        end
    end

    def update  #{ User Search method }
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

    def destroy #{ Unfollowing method }
        followship = Follow.where(follower_id: params[:follower_id], followed_user_id: params[:id])[0]
        if followship
            followship.destroy
            head :no_content
        else
            render json: { error: "Not allowed to unfollow twice" }, status: :not_found
        end
    end

    private 

    def follow_params
        params.permit(:follower_id, :followed_user_id, :id)
        # params.permit(:follower_id, :followed_user_id, :id, follow: [:follower_id, :followed_user_id])
    end
end

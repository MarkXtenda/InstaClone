class FollowController < ApplicationController
    
    def show    #{ Feed method}
        user = User.find(params[:id])
        follows = user.followings
        followed_users = []
        follows.each{|index| followed_users.push(index.id)}
        feed_posts = Post.where(user_id: followed_users).order(id: :desc)
        render json: feed_posts.to_json(only: [:id, :image, :caption, :likes], include: [user: { only: [:username, :avatar]}])
    end
    
    def create  #{ Following method }
        user = User.find_by(id: follow_params[:follower_id])
        is_following_exist = Follow.where(follow_params).any?

        if user && !is_following_exist
            new_following = Follow.create(follow_params)
            render json: user
        else
            render json: { error: "Not authorized or not allowed to follow twice" }, status: :unauthorized
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
        followship = Follow.where(follow_params)
        if followship
            # followship.destroy
            head :no_content
        else
            render json: { error: "Not authorized or not allowed to unfollow twice" }, status: :unauthorized
        end
    end

    private 

    def follow_params
        params.permit(:follower_id, :followed_user_id)
    end
end

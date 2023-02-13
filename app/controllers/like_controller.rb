class LikeController < ApplicationController
    def index
        is_like_exist = Like.where(user_id: params[:user_id], post_id: params[:post_id]).any?
        like_amount = Post.find(params[:post_id]).users_likes.length
        render json: {"is_like_exist": is_like_exist, "like_amount": like_amount }
    end

    # Simplified like/dislike method
    def create
        user = User.find(params[:user_id])
        like = Like.where(user_id: params[:user_id], post_id: params[:post_id])
        is_liked = like.any?
        if user && !is_liked
            create_like = Like.create(user_id: params[:user_id], post_id: params[:post_id])
            post = Post.find(params[:post_id])
            post_likes = post.users_likes.length
            post.liked = post_likes
            render json: {"is_liked": is_liked, "post_likes": post_likes}, status: :created
        elsif user && is_liked
            delete_like = like[0].destroy
            post = Post.find(params[:post_id])
            post_likes = post.users_likes.length
            render json: {"is_liked": is_liked, "post_likes": post_likes}
        else 
            existing_like = Like.where(user_id: params[:user_id], post_id: params[:post_id])[0]
            render json: existing_like
        end
    end

    private

    def like_params
        params.permit(:id, :user_id, :post_id)
    end
end

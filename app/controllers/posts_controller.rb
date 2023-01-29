class PostsController < ApplicationController
    def index
        posts = Post.all
        render json: posts
    end
    def show
        post = Post.find(params[:id])
        render json: post
    end
    def create
        user = User.find_by(id: session[:user_id])
        if user 
            post = user.posts.create(posts_params)
            render json: user, status: :created
        else 
            render json: { error: "Not authorized" }, status: :unauthorized
        end
    end

    private

    def posts_params
        params.permit(:image, :caption)
    end
end

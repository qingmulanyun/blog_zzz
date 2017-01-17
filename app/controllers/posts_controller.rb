class PostsController < ApplicationController
  before_action :get_current_user

  def index
    @posts = Post.where(user_id: current_user)
  end

  def new

  end

  def create
    @post = @user.posts.create! post_params
    redirect_to user_post_path(@user, @post)
  end

  def show
    @post = @user.posts.find(params[:id])
  end

  def destroy
    @user.posts.find(params[:id]).destroy!
    redirect_to user_posts_path
  end

  def edit
    @post = @user.posts.find(params[:id])
  end

  def update
    @user.posts.find(params[:id]).update(post_params)
    redirect_to user_post_path
  end

  def get_current_user
    @user = User.find(current_user)
  end

  private

  def post_params
    params.require(:post).permit(:title, :content)
  end
end

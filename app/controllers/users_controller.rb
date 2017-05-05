class UsersController < ApplicationController

  def show
    @posts = User.find(current_user).posts.paginate(:page => params[:page]).order(created_at: :desc)
    @user = User.find(current_user)
  end

  def public_hub
    @posts = Post.publicPosts.includes(:user, :comments).order(created_at: :desc)
  end
end

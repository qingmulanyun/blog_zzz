class UsersController < ApplicationController

  def show
    @posts = User.find(current_user).posts.order(created_at: :desc)
    @user = User.find(current_user)
  end
end

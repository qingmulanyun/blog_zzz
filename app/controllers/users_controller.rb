class UsersController < ApplicationController

  def show
    @posts = User.find(current_user).posts
    @user = User.find(current_user)
  end
end

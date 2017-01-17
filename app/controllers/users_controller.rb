class UsersController < ApplicationController

  def index
    @posts = User.find(current_user).posts
    @user = User.find(current_user)
  end
end

class UsersController < ApplicationController

  def index
    @posts = User.find(current_user).posts
  end
end

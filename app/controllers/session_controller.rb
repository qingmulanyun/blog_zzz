class SessionController < ApplicationController
  skip_before_filter :authenticate_user!, :only => :root

  def root
    if user_signed_in?
      redirect_to user_posts_path(current_user)
    end
  end
end

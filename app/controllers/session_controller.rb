class SessionController < ApplicationController
  skip_before_filter :authenticate_user!,  only: [:root, :show_public_posts]

  def root
    if user_signed_in?
      redirect_to user_posts_path(current_user)
    end
  end

  def show_public_posts
    @posts = Post.where(public: true).order(updated_at: :desc)
    render json: @posts
  end
end

class PublicController < ApplicationController
  skip_before_filter :authenticate_user!
  layout 'public_layout'


  def root
    if user_signed_in?
      redirect_to user_posts_path(current_user)
    end
  end

  def public_posts_index
    @posts = Post.publicPosts.includes(:user).order(updated_at: :asc)
    render 'public_posts_index.json'
  end

  def show_public_post
    @post = Post.friendly.find(params[:id])
    @comments = Comment.where(post_id: @post.id)
    @comments_counter = @comments.count
  end
end


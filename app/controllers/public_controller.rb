class PublicController < ApplicationController
  skip_before_action :authenticate_user!
  layout 'public_layout'


  def root
    if user_signed_in?
      redirect_to user_posts_path(current_user)
    end
  end

  def public_posts_index
    @posts = Post.publicPosts.includes(:user, :comments, :post_votes).order(created_at: :desc)
    render 'public_posts_index.json'
  end

  def show_public_post
    @post = Post.friendly.find(params[:id])
    @comments = Comment.where(post_id: @post.id)
    @comments_counter = @comments.count
    @votes = @post.post_votes.where(vote: true).count
  end
end


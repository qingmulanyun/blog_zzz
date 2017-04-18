class PublicController < ApplicationController
  skip_before_filter :authenticate_user!,  only: [:root, :show_public_posts]

  def root
    if user_signed_in?
      redirect_to user_posts_path(current_user)
    end
  end

  def show_public_posts
    posts = Post.publicPosts.includes(:user).order(updated_at: :desc)
    respond_to do |format|
      format.json { render json: { results: posts.map{ |p| { title: p.title, author: p.user.name, created_at: p.created_at, content: p.content, slug: p.slug } } } }
    end
  end
end

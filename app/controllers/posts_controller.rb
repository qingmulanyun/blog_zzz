class PostsController < ApplicationController
  before_action :get_current_user
  before_action :get_current_post, only: [:show, :edit, :update, :destroy]

  def index
    @posts = Post.where(user_id: current_user).order(updated_at: :desc)
  end

  def index_all
    # todo get all posts order by updated time
  end

  def new
  end

  def create
    @post = @user.posts.create! post_params
    redirect_to user_post_path(@user, @post)
  end

  def show
    @comments = @post.comments
    @comments_counter = @comments.count
  end

  def destroy
    authorize @post, :destroy?
    @post.destroy!
    redirect_to user_posts_path
  end

  def edit
  end

  def update
    authorize @post, :update?
    @post.update(post_params)
    redirect_to user_post_path(@user, @post)
  end

  private

  def get_current_post
    @post = Post.friendly.find(params[:id])
  end

  def get_current_user
    @user = User.find(current_user)
  end

  def post_params
    params.require(:post).permit(:title, :content, :public)
  end
end

class PostsController < ApplicationController
  skip_before_filter :authenticate_user!, only: [:show]
  before_action :get_current_user
  before_action :get_current_post, only: [:show, :edit, :update, :destroy]

  def index
    @posts = Post.where(user_id: current_user).order(updated_at: :desc)
  end

  def index_all
    # todo get all posts order by updated time
  end

  def new
    @post = Post.new
    authorize @post
  end

  def create
    @post = Post.new(post_params)
    @post.user = current_user
    authorize @post, :create?

    redirect_to user_post_path(@user, @post) if @post.save
  end

  def show
    @comments = @post.comments
    @comments_counter = @comments.count
    @votes = @post.post_votes.where(vote: true).count
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
    @user = User.friendly.find(params[:user_id])
    raise Exception if @user.nil?
  end

  def post_params
    params.require(:post).permit(:title, :content, :public)
  end
end

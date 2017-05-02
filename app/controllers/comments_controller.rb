class CommentsController < ApplicationController
  def create
    post_id = params[:post_id]
    @post = Post.friendly.find(post_id)
    @user = current_user
    Comment.create(comments_params.merge!(post_id: @post.id, user_id: @user.id))
    redirect_to user_post_path(@user, @post)
  end

  private

  def comments_params
    params.require(:comment).permit(:content, :parent_id, :post_id, :user_id)
  end
end


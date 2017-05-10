class CommentsController < ApplicationController
  def create
    post_id = params[:post_id]
    @post = Post.friendly.find(post_id)
    @user = current_user
    comment = Comment.new(comments_params.merge!(post_id: @post.id, user_id: @user.id))

    authorize comment

    redirect_to user_post_path(@user, @post) if comment.save
  end

  private

  def comments_params
    params.require(:comment).permit(:content, :parent_id, :post_id, :user_id)
  end
end


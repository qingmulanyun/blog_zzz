class UsersController < ApplicationController
  before_action :get_current_user

  def show
    @posts = @user.posts.paginate(:page => params[:page]).order(created_at: :desc)
    @posts_by_month = @user.posts
                          .select("COUNT( * ) as posts, to_char(created_at, 'Month') as MONTH , to_char(created_at, 'YYYY') as YEAR")
                          .group("MONTH, YEAR")
                          .order("YEAR, MONTH")
  end

  def public_hub
    @posts = Post.publicPosts.includes(:user, :comments).order(created_at: :desc)
  end

  def archive_month
    @year = params[:year]
    @month = params[:month]
    month_year = Time.new(@year, Date::MONTHNAMES.index(@month))
    @posts = @user.posts.paginate(:page => params[:page]).this_month(month_year).order(created_at: :desc)
  end

  def archive_year
    @year = params[:year]
    year = Time.new(@year)
    @posts_by_current_year = @user.posts.paginate(:page => params[:page]).this_year(year)
                         .select("COUNT( * ) as posts, to_char(created_at, 'Month') as MONTH , to_char(created_at, 'YYYY') as YEAR")
                         .group("MONTH, YEAR")
                         .order("MONTH, YEAR")
  end

  def archive_root
    @posts_by_year = @user.posts.paginate(:page => params[:page])
                         .select("COUNT( * ) as posts, to_char(created_at, 'YYYY') as YEAR")
                         .group(" YEAR")
                         .order("YEAR")
  end

  private
  def get_current_user
    @user = User.find(current_user)
  end
end

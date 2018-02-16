class Post < ActiveRecord::Base
  # extend FriendlyId
  # friendly_id :title, use: :slugged
  geocoded_by :created_ip
  before_create :geocode

  belongs_to :user
  has_many :comments
  has_many :post_votes

  validates :title, presence: true
  validates :content, presence: true

  scope :publicPosts, -> { where public: true}

  scope :this_month, lambda { |month_year| where(:created_at => month_year.beginning_of_month..month_year.end_of_month) }
  scope :this_year, lambda { |year| where(created_at: year.beginning_of_year..year.end_of_year )}

  self.per_page = 5

  def should_generate_new_friendly_id?
    title_changed?
  end

  def created_ip
    self.user.current_sign_in_ip.to_s
  end
end
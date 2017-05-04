class Post < ActiveRecord::Base
  extend FriendlyId
  friendly_id :title, use: :slugged

  belongs_to :user
  has_many :comments

  validates :title, presence: true
  validates :content, presence: true

  scope :publicPosts, -> { where public: true}

  self.per_page = 5

  def should_generate_new_friendly_id?
    title_changed?
  end
end
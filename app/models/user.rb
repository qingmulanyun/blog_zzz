class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  extend FriendlyId
  friendly_id :name, use: :slugged

  has_many :posts

  before_save :default_name


  def default_name
    self.first_name = 'New' if self.first_name.blank?
    self.last_name = 'Member' if self.last_name.blank?
    self.name = self.first_name + " " + self.last_name;
  end
end

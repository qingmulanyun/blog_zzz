class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :posts

  before_save :default_name

  def name
    first_name + ' ' + last_name || nickname
  end

  def default_name
    self.first_name = 'New' if self.first_name.blank?
    self.last_name = 'Member' if self.last_name.blank?
  end
end

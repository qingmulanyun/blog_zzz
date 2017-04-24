class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, :omniauth_providers => [:google_oauth2]
  extend FriendlyId
  friendly_id :name, use: :slugged

  has_many :posts

  before_save :default_name


  def default_name
    self.first_name = 'New' if self.first_name.blank?
    self.last_name = 'Member' if self.last_name.blank?
  end

  def should_generate_new_friendly_id?
    name_changed?
  end

  def self.from_omniauth(access_token)
    data = access_token.info
    user = User.where(:email => data["email"]).first
    update_image_based_google(user, data)

    unless user
        user = User.create(name: data["name"],
           email: data["email"],
           image_url: data['image'],
           password: Devise.friendly_token[0,20]
        )
    end
    user
  end

  def self.update_image_based_google(user, data)
    if user.present? && user.image_url.nil?
      user.image_url =  data['image']
      user.save!
    end
  end
end

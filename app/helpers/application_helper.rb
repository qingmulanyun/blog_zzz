module ApplicationHelper
  def default_profile_img_url
    '/assets/blog/profile.jpeg'
  end

  def title(text)
    content_for :title, text
  end
end

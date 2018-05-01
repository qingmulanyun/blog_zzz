module NavHelper
  def membership_display
    span_context = ''
    case current_user.membership
      when 'vip'
        span_context = '(VIP)'
    end
    content_tag(:span, span_context, class: "cart-badges")
  end
end

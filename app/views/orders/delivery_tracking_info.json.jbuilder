json.array! @result do |track_info|
  json.time track_info.split('||')[0]
  json.location track_info.split('||')[1]
  json.description track_info.split('||')[2] || ''
end


json.array! @result do |track_info|
  track_number = track_info[0]
  json.track_number track_number
  json.details do
    json.array! track_info[1] do |track_details_row|
      track_details = track_details_row.split('||')
      json.time track_details[0]
      json.location track_details[1]
      json.description track_details[2] || ''
    end
  end
end


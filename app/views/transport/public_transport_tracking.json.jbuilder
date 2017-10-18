json.array! @feed.entity do |entity|
  json.vehicle_id entity.vehicle.vehicle.id

  json.location do
    json.lat entity.vehicle.position.latitude
    json.lng entity.vehicle.position.longitude
  end
end


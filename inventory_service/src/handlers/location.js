export async function listLocations(config, req, resp) {
  return resp.json(req.group.locations || []);
}

export async function addLocation(config, req, resp) {
  if (typeof req.body.name !== 'string') return resp.json({ message: 'NO_LOCATION_NAME' });

  const location = {
    name: req.body.name,
    namelower: req.body.name.toLowerCase(),
    address: req.body.address,
  };

  if (req.group.locations.some((l) => l.name === location.name)) {
    return resp.json({ message: 'DUPLICATE_LOCATION' });
  }

  req.group.locations.push(location);

  try {
    await req.group.save();
  } catch (err) {
    console.log(err)
    return resp.json({ message: 'SERVER_ERROR' });
  }

  return resp.json({ message: 'OK', ...location });
}

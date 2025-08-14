export async function lookupPin(pin) {
  try {
    const r = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
    const data = await r.json();
    const item = data?.[0];
    if (item?.Status === "Success" && item?.PostOffice?.length) {
      const po = item.PostOffice[0];
      return { state: po.State, city: po.District };
    }
    return null;
  } catch {
    return null;
  }
}

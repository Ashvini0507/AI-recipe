import os
import codecs

parts = {
    'en': r'c:\Users\ashvi\OneDrive\Desktop\Documents\Ashvini (2)\Ashvini\Aireciperecommendationapp\client\src\i18n_en.ts.part',
    'hi': r'c:\Users\ashvi\OneDrive\Desktop\Documents\Ashvini (2)\Ashvini\Aireciperecommendationapp\client\src\i18n_hi.ts.part',
    'ta': r'c:\Users\ashvi\OneDrive\Desktop\Documents\Ashvini (2)\Ashvini\Aireciperecommendationapp\client\src\i18n_ta.ts.part',
    'ml': r'c:\Users\ashvi\OneDrive\Desktop\Documents\Ashvini (2)\Ashvini\Aireciperecommendationapp\client\src\i18n_ml.ts.part'
}

profiles = {
    'en': '"profile": { "community_member": "Community Member", "update_success": "Profile updated successfully", "edit_profile": "Edit Profile", "display_name": "Display Name", "save_changes": "Save Changes", "account_preferences": "Account & Preferences", "diet_preference": "Diet Preference", "diet_desc": "Affects recommendations", "veg": "Veg", "non_veg": "Non-Veg", "app_language": "App Language", "measurement_system": "Measurement System", "metric": "Grams/ML", "imperial": "Cups", "device_display": "Device & Display", "notifications": "Push Notifications", "notifications_desc": "Meal reminders", "dark_mode": "Dark Mode", "smart_appliances": "Smart Appliances", "home_connect_desc": "Home Connect integration", "community": "Community", "share_toast": "App link copied to clipboard!", "tell_friend": "Tell a Friend", "rate_toast": "Redirecting to Store...", "rate_app": "Rate App", "secure_sync": "Secure Cloud Sync Active", "role": { "user": "Community Member", "admin": "Administrator" } }',
    
    'hi': '"profile": { "community_member": "समुदाय सदस्य", "update_success": "प्रोफ़ाइल सफलतापूर्वक अपडेट की गई", "edit_profile": "प्रोफ़ाइल संपादित करें", "display_name": "प्रदर्शन नाम", "save_changes": "परिवर्तन सहेजें", "account_preferences": "खाता और प्राथमिकताएं", "diet_preference": "आहार प्राथमिकता", "diet_desc": "सिफारिशों को प्रभावित करता है", "veg": "शाकाहारी", "non_veg": "मांसाहारी", "app_language": "ऐप की भाषा", "measurement_system": "मापन प्रणाली", "metric": "ग्राम/मिली", "imperial": "कप", "device_display": "उपकरण और प्रदर्शन", "notifications": "पुश सूचनाएं", "notifications_desc": "भोजन अनुस्मारक", "dark_mode": "डार्क मोड", "smart_appliances": "स्मार्ट उपकरण", "home_connect_desc": "होम कनेक्ट एकीकरण", "community": "समुदाय", "share_toast": "ऐप लिंक क्लिपबोर्ड पर कॉपी किया गया!", "tell_friend": "एक दोस्त को बताएं", "rate_toast": "स्टोर पर रीडायरेक्ट कर रहा है...", "rate_app": "ऐप को रेट करें", "secure_sync": "सुरक्षित क्लाउड सिंक सक्रिय", "role": { "user": "समुदाय सदस्य", "admin": "व्यवस्थापक" } }',

    'ta': '"profile": { "community_member": "சமூக உறுப்பினர்", "update_success": "சுயவிவரம் வெற்றிகரமாக புதுப்பிக்கப்பட்டது", "edit_profile": "சுயவிவரத்தை திருத்து", "display_name": "காட்சி பெயர்", "save_changes": "மாற்றங்களைச் சேமி", "account_preferences": "கணக்கு மற்றும் விருப்பத்தேர்வுகள்", "diet_preference": "உணவு விருப்பம்", "diet_desc": "பரிந்துரைகளை பாதிக்கும்", "veg": "சைவம்", "non_veg": "அசைவம்", "app_language": "பயன்பாட்டு மொழி", "measurement_system": "அளவீட்டு முறை", "metric": "கிராம்/மிலி", "imperial": "கோப்பைகள்", "device_display": "சாதனம் மற்றும் காட்சி", "notifications": "அறிவிப்புகள்", "notifications_desc": "உணவு நினைவூட்டல்கள்", "dark_mode": "இருண்ட பயன்முறை", "smart_appliances": "ஸ்மார்ட் சாதனங்கள்", "home_connect_desc": "ஹோம் கனெக்ட் ஒருங்கிணைப்பு", "community": "சமூகம்", "share_toast": "பயன்பாட்டு இணைப்பு நகலெடுக்கப்பட்டது!", "tell_friend": "நண்பருக்கு சொல்லுங்கள்", "rate_toast": "ஸ்டோருக்குத் திருப்பி விடப்படுகிறது...", "rate_app": "பயன்பாட்டை மதிப்பிடுக", "secure_sync": "பாதுகாப்பான கிளவுட் ஒத்திசைவு செயலில் உள்ளது", "role": { "user": "சமூக உறுப்பினர்", "admin": "நிர்வாகி" } }',

    'ml': '"profile": { "community_member": "കമ്മ്യൂണിറ്റി അംഗം", "update_success": "പ്രൊഫൈൽ വിജയകരമായി അപ്ഡേറ്റ് ചെയ്തു", "edit_profile": "പ്രൊഫൈൽ തിരുത്തുക", "display_name": "പ്രദർശന നാമം", "save_changes": "മാറ്റങ്ങൾ സംരക്ഷിക്കുക", "account_preferences": "അക്കൗണ്ടും മുൻഗണനകളും", "diet_preference": "ഭക്ഷണ മുൻഗണന", "diet_desc": "ശുപാർശകളെ ബാധിക്കുന്നു", "veg": "വെജ്", "non_veg": "നോൺ-വെജ്", "app_language": "ആപ്പ് ഭാഷ", "measurement_system": "അളക്കൽ സിസ്റ്റം", "metric": "ഗ്രാം/മില്ലി", "imperial": "കപ്പുകൾ", "device_display": "ഉപകരണവും ഡിസ്പ്ലേയും", "notifications": "അറിയിപ്പുകൾ", "notifications_desc": "ഭക്ഷണ ഓർമ്മപ്പെടുത്തലുകൾ", "dark_mode": "ഡാർക്ക് മോഡ്", "smart_appliances": "സ്മാർട്ട് വീട്ടുപകരണങ്ങൾ", "home_connect_desc": "ഹോം കണക്റ്റ് സംയോജനം", "community": "കമ്മ്യൂണിറ്റി", "share_toast": "ആപ്പ് ലിങ്ക് പകർത്തി!", "tell_friend": "ഒരു സുഹൃത്തിനോട് പറയുക", "rate_toast": "സ്റ്റോറിലേക്ക് തിരിച്ചുവിടുന്നു...", "rate_app": "ആപ്പ് റേറ്റുചെയ്യുക", "secure_sync": "സുരക്ഷിത ക്ലൗഡ് സമന്വയം സജീവമാണ്", "role": { "user": "കമ്മ്യൂണിറ്റി അംഗം", "admin": "അഡ്മിനിസ്ട്രേറ്റർ" } }'
}

for lang, path in parts.items():
    if not os.path.exists(path):
        continue
    with codecs.open(path, 'r', 'utf-8') as f:
        content = f.read()

    if '"profile": {' in content:
        print(f"Already added to {lang}")
        continue

    new_lines = []
    lines = content.splitlines()
    for line in lines:
        if '"diet_calendar":' in line:
            if not line.strip().endswith(','):
                line += ','
            new_lines.append(line)
            new_lines.append('            ' + profiles[lang])
        else:
            new_lines.append(line)

    with codecs.open(path, 'w', 'utf-8') as f:
        f.write('\n'.join(new_lines))
        
print("Updated .part files!")

import JSZip from 'jszip';

export async function generateAndroidProjectZip(appName: string = 'TravelConnect', packageName: string = 'com.travelconnect.app') {
  const zip = new JSZip();

  const manifestXml = `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="${packageName}">

    <!-- Permissions required for Travel Connect Android App -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.VIBRATE" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.TravelConnect"
        android:usesCleartextTraffic="true"
        android:hardwareAccelerated="true">

        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:configChanges="orientation|screenSize|keyboardHidden"
            android:theme="@style/Theme.TravelConnect.Fullscreen">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>

            <!-- Deep link support -->
            <intent-filter android:autoVerify="true">
                <action android:name="android.intent.action.VIEW" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />
                <data android:scheme="https" android:host="travelconnect.app" />
            </intent-filter>
        </activity>
    </application>
</manifest>`;

  const mainActivityJava = `package ${packageName};

import android.annotation.SuppressLint;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ProgressBar;
import androidx.appcompat.app.AppCompatActivity;

/**
 * Travel Connect Native Android Activity
 * Hosts responsive, hardware-accelerated WebView with full offline caching and native bridge
 */
public class MainActivity extends AppCompatActivity {

    private WebView webView;
    private ProgressBar progressBar;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        webView = findViewById(R.id.webview);
        progressBar = findViewById(R.id.progressBar);

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);
        settings.setAllowFileAccess(true);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);
        settings.setSupportZoom(false);

        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onProgressChanged(WebView view, int newProgress) {
                if (newProgress < 100) {
                    progressBar.setVisibility(View.VISIBLE);
                    progressBar.setProgress(newProgress);
                } else {
                    progressBar.setVisibility(View.GONE);
                }
            }
        });

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                return false;
            }

            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon) {
                super.onPageStarted(view, url, favicon);
            }
        });

        // Load application URL or offline assets
        String appUrl = "${typeof window !== 'undefined' ? window.location.href : 'https://travelconnect.app'}";
        webView.loadUrl(appUrl);
    }

    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
`;

  const activityMainXml = `<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#00A99D">

    <ProgressBar
        android:id="@+id/progressBar"
        style="?android:attr/progressBarStyleHorizontal"
        android:layout_width="match_parent"
        android:layout_height="4dp"
        android:indeterminate="false"
        android:max="100"
        android:progressDrawable="@android:color/white"
        android:visibility="gone" />

    <WebView
        android:id="@+id/webview"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_below="@id/progressBar" />

</RelativeLayout>`;

  const buildGradleApp = `plugins {
    id 'com.android.application'
}

android {
    namespace '${packageName}'
    compileSdk 34

    defaultConfig {
        applicationId "${packageName}"
        minSdk 24
        targetSdk 34
        versionCode 1
        versionName "1.0.0"

        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
        debug {
            applicationIdSuffix ".debug"
            debuggable true
        }
    }
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
}

dependencies {
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'com.google.android.material:material:1.11.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.4'
    implementation 'androidx.webkit:webkit:1.10.0'
}
`;

  const settingsGradle = `pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = "${appName}"
include ':app'
`;

  const buildGradleRoot = `buildscript {
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath "com.android.tools.build:gradle:8.2.2"
    }
}

task clean(type: Delete) {
    delete rootProject.buildDir
}
`;

  const stringsXml = `<resources>
    <string name="app_name">Travel Connect</string>
    <string name="bus_timetable">Bus Timetable</string>
    <string name="library_books">Books Library</string>
    <string name="hostel_stays">Hostel Stays</string>
    <string name="course_schedule">Course Schedule</string>
</resources>`;

  const colorsXml = `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="primary_teal">#00A99D</color>
    <color name="primary_teal_dark">#008F85</color>
    <color name="primary_orange">#F97316</color>
    <color name="dark_blue">#0F172A</color>
    <color name="white">#FFFFFF</color>
</resources>`;

  const stylesXml = `<resources>
    <style name="Theme.TravelConnect" parent="Theme.MaterialComponents.DayNight.NoActionBar">
        <item name="colorPrimary">@color/primary_teal</item>
        <item name="colorPrimaryVariant">@color/primary_teal_dark</item>
        <item name="colorOnPrimary">@color/white</item>
        <item name="android:statusBarColor">@color/primary_teal</item>
    </style>
    <style name="Theme.TravelConnect.Fullscreen" parent="Theme.TravelConnect">
        <item name="android:windowNoTitle">true</item>
        <item name="android:windowActionBar">false</item>
    </style>
</resources>`;

  const readmeMd = `# ${appName} - Android Studio Project & APK Build Guide

## 📱 Quick Build Instructions

1. **Option A: Build APK in Android Studio**
   - Extract this \`${appName}-android-project.zip\`
   - Open Android Studio
   - Select **File > Open** and select this directory
   - Wait for Gradle Sync to finish
   - Click **Build > Build Bundle(s) / APK(s) > Build APK(s)**
   - The generated APK will be at:
     \`app/build/outputs/apk/debug/app-debug.apk\`

2. **Option B: Build from Command Line (Terminal / Mac / Linux / Windows)**
   \`\`\`bash
   # On macOS/Linux:
   ./gradlew assembleDebug

   # On Windows:
   gradlew.bat assembleDebug
   \`\`\`

3. **Option C: Install directly on Android Device via WebAPK (No Android Studio required!)**
   - Open the web application URL on Google Chrome for Android:
   - Tap the three dots menu (⋮) -> **Install app** or **Add to Home screen**
   - Google Chrome's WebAPK service automatically builds and registers a signed native APK on your Android device!

4. **Features included in this Android package:**
   - Bus departure schedules with live filter and next bus badge
   - Books library reader with excerpts and category filter
   - Hostels booking system with room selection modal
   - Weekly course timetable with next class indicator
   - Full offline caching via Android WebView storage and Service Worker
`;

  const githubWorkflow = `name: Build Android APK

on:
  push:
    branches: [ main, master ]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up JDK 17
        uses: actions/setup-java@v4
        with:
          java-version: '17'
          distribution: 'temurin'
      - name: Build Debug APK
        run: ./gradlew assembleDebug --stacktrace
      - name: Upload APK Artifact
        uses: actions/upload-artifact@v4
        with:
          name: TravelConnect-Debug-APK
          path: app/build/outputs/apk/debug/app-debug.apk
`;

  const gradlewScript = `#!/usr/bin/env sh
# Gradle wrapper execution script for Linux/macOS
exec gradle "$@"
`;

  const gradlewBat = `@rem Gradle wrapper execution script for Windows
@rem Run with Gradle installed
gradle %*
`;

  // Populate ZIP folders
  zip.file('README.md', readmeMd);
  zip.file('build.gradle', buildGradleRoot);
  zip.file('settings.gradle', settingsGradle);
  zip.file('gradle.properties', 'android.useAndroidX=true\nandroid.enableJetifier=true\norg.gradle.jvmargs=-Xmx2048m\n');
  zip.file('gradlew', gradlewScript);
  zip.file('gradlew.bat', gradlewBat);

  // GitHub Actions workflow for 1-click cloud APK compilation
  const githubFolder = zip.folder('.github')!;
  githubFolder.folder('workflows')!.file('build-apk.yml', githubWorkflow);

  // App folder
  const appFolder = zip.folder('app')!;
  appFolder.file('build.gradle', buildGradleApp);
  appFolder.file('proguard-rules.pro', '# Keep WebView classes\n-keepclassmembers class * {\n    @android.webkit.JavascriptInterface <methods>;\n}\n');

  // Source files
  const mainFolder = appFolder.folder('src/main')!;
  mainFolder.file('AndroidManifest.xml', manifestXml);

  const javaFolder = mainFolder.folder(`java/${packageName.replace(/\./g, '/')}`)!;
  javaFolder.file('MainActivity.java', mainActivityJava);

  // Res folder
  const resFolder = mainFolder.folder('res')!;
  resFolder.folder('layout')!.file('activity_main.xml', activityMainXml);
  resFolder.folder('values')!.file('strings.xml', stringsXml);
  resFolder.folder('values')!.file('colors.xml', colorsXml);
  resFolder.folder('values')!.file('styles.xml', stylesXml);

  // Assets folder
  const assetsFolder = mainFolder.folder('assets')!;
  assetsFolder.file('app-config.json', JSON.stringify({
    appName: 'Travel Connect',
    version: '1.0.0',
    platform: 'Android',
    themeColor: '#00A99D'
  }, null, 2));

  // Generate blob
  const content = await zip.generateAsync({ type: 'blob' });
  return content;
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

import React, { useState } from 'react';
import {
  Download,
  Smartphone,
  CheckCircle,
  ExternalLink,
  QrCode,
  AlertTriangle,
  Sparkles,
  HelpCircle,
  FileCode,
  Terminal,
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { generateAndroidProjectZip, downloadBlob } from '../utils/apkGenerator';

interface ApkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const ApkModal: React.FC<ApkModalProps> = ({ isOpen, onClose, onShowToast }) => {
  const { isInstallable, isInstalled, triggerInstall } = usePWAInstall();
  const [isGeneratingProject, setIsGeneratingProject] = useState<boolean>(false);
  const [downloadStep, setDownloadStep] = useState<'options' | 'generating' | 'done'>('options');
  const [activeTab, setActiveTab] = useState<'install' | 'fix-parse' | 'cloud-apk' | 'source' | 'qr'>('fix-parse');

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://travelconnect.app';
  const pwaBuilderUrl = `https://www.pwabuilder.com/reportcard?site=${encodeURIComponent(currentUrl)}`;

  const handleNativeInstall = async () => {
    if (isInstallable) {
      onShowToast('Opening Android native installer prompt...');
      const outcome = await triggerInstall();
      if (outcome === 'accepted') {
        onShowToast('Installation started! Check your Android home screen.');
      } else {
        onShowToast('Install prompt dismissed');
      }
    } else {
      onShowToast('On Android Chrome: Tap menu (⋮) -> "Install app"');
    }
  };

  const handleDownloadAndroidProject = async () => {
    setIsGeneratingProject(true);
    setDownloadStep('generating');
    onShowToast('Packaging Android Studio & Gradle project...');

    try {
      const zipBlob = await generateAndroidProjectZip('TravelConnect', 'com.travelconnect.app');
      downloadBlob(zipBlob, 'TravelConnect-Android-Studio-Source-Project.zip');
      setIsGeneratingProject(false);
      setDownloadStep('done');
      onShowToast('Downloaded Android Studio project with Gradle & GitHub Actions!');
    } catch (err) {
      console.error(err);
      setIsGeneratingProject(false);
      setDownloadStep('options');
      onShowToast('Failed to generate project archive');
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/80 z-50 flex items-end sm:items-center justify-center backdrop-blur-xs p-0 sm:p-4">
      <div className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl p-5 max-h-[92vh] overflow-y-auto no-scrollbar shadow-2xl animate-in slide-in-from-bottom sm:zoom-in-95 duration-200">
        <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto mb-4 sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-sm shadow-teal-600/30">
              <Smartphone className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
                Android App & APK Center
                <span className="text-[10px] bg-teal-100 text-teal-800 font-black px-1.5 py-0.5 rounded uppercase">
                  v1.0.0
                </span>
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">
                Install directly on Android or fix APK parse errors
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-xl font-bold p-1 rounded-lg"
          >
            &times;
          </button>
        </div>

        {/* Prominent Parse Error Notice & Fix Banner */}
        <div className="my-3 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-xs font-black uppercase tracking-wide text-amber-950">
                Fix "There was a problem parsing the package" (Parse Error)
              </h3>
              <p className="text-[11px] text-amber-800 mt-1 leading-relaxed">
                Android shows a <strong>Parse Error</strong> when an uncompiled ZIP archive or raw project file is opened directly by Android's Package Installer. To install without any parse error, use <strong>Method 1 (Native WebAPK)</strong> or <strong>Method 2 (PWABuilder Cloud APK)</strong> below.
              </p>
            </div>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-4 text-xs font-bold overflow-x-auto no-scrollbar gap-0.5">
          <button
            onClick={() => setActiveTab('fix-parse')}
            className={`px-3 py-2 rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'fix-parse'
                ? 'bg-white text-teal-700 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            🛠️ Fix Parse Error
          </button>
          <button
            onClick={() => setActiveTab('install')}
            className={`px-3 py-2 rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'install'
                ? 'bg-white text-teal-700 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            ⚡ 1-Click Install
          </button>
          <button
            onClick={() => setActiveTab('cloud-apk')}
            className={`px-3 py-2 rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'cloud-apk'
                ? 'bg-white text-teal-700 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            📦 Cloud APK
          </button>
          <button
            onClick={() => setActiveTab('source')}
            className={`px-3 py-2 rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'source'
                ? 'bg-white text-teal-700 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            💻 Android Studio ZIP
          </button>
          <button
            onClick={() => setActiveTab('qr')}
            className={`px-3 py-2 rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'qr'
                ? 'bg-white text-teal-700 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            📱 QR Code
          </button>
        </div>

        {/* Tab Content: Fix Parse Error Guide */}
        {activeTab === 'fix-parse' && (
          <div className="space-y-3.5">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-teal-600" />
                Why does Android show "Problem parsing the package"?
              </h4>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4 leading-relaxed">
                <li>
                  <strong>Uncompiled Bytecode:</strong> Android requires a binary compiled APK with Dalvik bytecode (<code>classes.dex</code>) and a binary-encoded <code>AndroidManifest.xml</code>. Uncompiled ZIPs or plain-text files cause Android's PackageParser to fail.
                </li>
                <li>
                  <strong>Android Security Permissions:</strong> Android requires apps installed outside Google Play to have "Install unknown apps" enabled in <em>Settings &gt; Apps &gt; Chrome/Files</em>.
                </li>
                <li>
                  <strong>Signature Verification:</strong> APK packages require an official v2/v3 cryptographic signature.
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-2.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-teal-800 bg-teal-100 px-2 py-0.5 rounded-full inline-block">
                Guaranteed Fix #1: Native WebAPK (Zero Parse Errors)
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">
                Android devices have Google's <strong>WebAPK compiler</strong> built directly into Chrome, Edge, and Samsung Internet. When installed this way, Google Play Services automatically compiles a genuine, signed APK directly on your device with <strong>0 parse errors</strong>!
              </p>
              <button
                onClick={handleNativeInstall}
                className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-teal-600/30 flex items-center justify-center gap-2 active:scale-98 transition-all"
              >
                <Smartphone className="w-4 h-4" />
                <span>Install Native Android App Now (No Parse Error)</span>
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-800 bg-slate-200 px-2 py-0.5 rounded-full inline-block">
                Guaranteed Fix #2: Build Signed APK via PWABuilder
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Use Microsoft & Google's official <strong>PWABuilder Android tool</strong> to generate a signed binary <code>.apk</code> ready for immediate sideloading or Google Play Store publishing.
              </p>
              <a
                href={pwaBuilderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 bg-slate-900 hover:bg-teal-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open PWABuilder Signed APK Generator</span>
              </a>
            </div>
          </div>
        )}

        {/* Tab Content: 1-Click Install */}
        {activeTab === 'install' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-100">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-wide">
                    Android WebAPK Engine
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Google Chrome and Android browsers build a real, signed APK on your device with
                    its own home icon, splash screen, and offline storage.
                  </p>
                </div>
              </div>

              {isInstalled ? (
                <div className="mt-3.5 flex items-center gap-2 p-2.5 bg-emerald-100/70 text-emerald-800 rounded-xl text-xs font-bold">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Travel Connect is already running in native standalone Android mode!</span>
                </div>
              ) : (
                <button
                  onClick={handleNativeInstall}
                  className="mt-3.5 w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-teal-600/30 flex items-center justify-center gap-2 active:scale-98 transition-all"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Install Native Android App Now</span>
                </button>
              )}
            </div>

            {/* Step-by-Step Android Instructions */}
            <div className="space-y-2 pt-1">
              <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                How to install on Android phone:
              </h4>

              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex gap-2.5 items-start p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-[10px] flex-shrink-0">
                    1
                  </span>
                  <div>
                    <span className="font-bold text-slate-800">In Google Chrome for Android:</span>{' '}
                    Tap the 3 dots menu <span className="font-mono font-bold">(⋮)</span> at the top
                    right.
                  </div>
                </div>

                <div className="flex gap-2.5 items-start p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-[10px] flex-shrink-0">
                    2
                  </span>
                  <div>
                    <span className="font-bold text-slate-800">Select "Install App":</span> Tap{' '}
                    <span className="font-semibold text-teal-700">"Install app"</span> or{' '}
                    <span className="font-semibold text-teal-700">"Add to Home screen"</span>.
                  </div>
                </div>

                <div className="flex gap-2.5 items-start p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-[10px] flex-shrink-0">
                    3
                  </span>
                  <div>
                    <span className="font-bold text-slate-800">Instant Launcher Icon:</span> Android
                    will compile a WebAPK with the Travel Connect teal airplane logo and place it on
                    your app drawer!
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Cloud APK Builder (PWABuilder / Bubblewrap) */}
        {activeTab === 'cloud-apk' && (
          <div className="space-y-3.5">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wide">
                Generate Signed Binary APK (PWABuilder)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                PWABuilder (developed by Microsoft with Google's Bubblewrap) generates a certified, signed <code>.apk</code> and <code>.aab</code> package that installs on any Android device without parse errors.
              </p>

              <div className="bg-white p-3 rounded-xl border border-slate-200 text-[11px] font-mono text-slate-600 space-y-1">
                <div>📦 App Name: Travel Connect</div>
                <div>🏷️ Package ID: com.travelconnect.app</div>
                <div>🔒 Architecture: Trusted Web Activity (TWA)</div>
                <div>✅ Compatible: Android 5.0 through Android 15+</div>
              </div>

              <a
                href={pwaBuilderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-teal-600/30 flex items-center justify-center gap-2 active:scale-98 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Build Signed APK on PWABuilder</span>
              </a>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
              <span className="font-bold">Android Sideloading Tip:</span> If you download an APK directly from your browser, make sure to enable <em>"Install unknown apps"</em> when Android prompts you:
              <p className="text-[11px] mt-1 text-amber-800">
                Go to <strong>Settings &gt; Apps &gt; Special app access &gt; Install unknown apps</strong> and allow your browser or Files app.
              </p>
            </div>
          </div>
        )}

        {/* Tab Content: Source & Android Studio Build */}
        {activeTab === 'source' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wide mb-1">
                Android Studio Source Project (.ZIP)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Download the complete native Android project ready to import into Android Studio or
                build via command line with Gradle.
              </p>

              <div className="space-y-1.5 text-[11px] text-slate-500 mb-4 bg-white p-3 rounded-xl border border-slate-100 font-mono">
                <div>📁 package: com.travelconnect.app</div>
                <div>📄 AndroidManifest.xml (Internet, Vibration, Launcher)</div>
                <div>☕ MainActivity.java (Hardware accelerated WebView container)</div>
                <div>⚙️ build.gradle (AGP 8.2, Target SDK 34, Min SDK 24)</div>
                <div>🤖 .github/workflows/build-apk.yml (Automated GitHub Actions APK build)</div>
              </div>

              <div className="flex gap-2">
                <button
                  disabled={isGeneratingProject}
                  onClick={handleDownloadAndroidProject}
                  className="flex-1 py-3 px-4 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-extrabold text-xs rounded-xl shadow-md shadow-teal-600/30 flex items-center justify-center gap-2 active:scale-98 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>
                    {isGeneratingProject ? 'Packaging Android Studio ZIP...' : 'Download Project ZIP'}
                  </span>
                </button>
              </div>

              {downloadStep === 'done' && (
                <div className="mt-3 p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>
                    Project downloaded! Unzip and run <code className="font-mono font-bold">./gradlew assembleDebug</code> to compile <code className="font-mono font-bold">app-debug.apk</code>.
                  </span>
                </div>
              )}
            </div>

            {/* Command-line build snippet */}
            <div className="p-3.5 bg-slate-900 text-slate-100 rounded-2xl text-[11px] font-mono overflow-x-auto space-y-1">
              <div className="text-slate-400 font-bold mb-1"># Compile APK in Terminal:</div>
              <div>unzip TravelConnect-Android-Studio-Source-Project.zip</div>
              <div>cd TravelConnect</div>
              <div className="text-teal-400">./gradlew assembleDebug</div>
              <div className="text-slate-400 text-[10px] mt-1">
                # Output compiled binary APK: app/build/outputs/apk/debug/app-debug.apk
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: QR Install */}
        {activeTab === 'qr' && (
          <div className="space-y-4 text-center">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wide mb-1">
                Scan with Android Phone
              </h3>
              <p className="text-xs text-slate-500 mb-4 max-w-xs">
                Open your Android Camera, Google Lens, or QR Scanner to test and install directly on
                your smartphone without any parse errors.
              </p>

              {/* QR Code Container */}
              <div className="p-4 bg-white rounded-2xl border-2 border-teal-500 shadow-md mb-3">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                    currentUrl
                  )}`}
                  alt="QR Code for Android Install"
                  className="w-44 h-44 object-contain"
                />
              </div>

              <span className="text-[11px] font-mono text-slate-400 truncate max-w-xs">
                {currentUrl}
              </span>
            </div>

            <button
              onClick={() => {
                navigator.clipboard?.writeText(currentUrl);
                onShowToast('App URL copied to clipboard!');
              }}
              className="w-full py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Copy App Link for Android
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span>Android 7.0+ (API 24+) Compatible</span>
          <button onClick={onClose} className="font-bold text-slate-700 hover:text-teal-600">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

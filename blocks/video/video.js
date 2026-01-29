export default function decorate(block) {
    console.log("video block");
  const link = block.querySelector('a');
  if (!link) return;

  const url = link.href.trim();
  block.textContent = ''; // clear authoring content

  let videoEl;

  // 🎥 YouTube
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const videoId = getYouTubeId(url);
    videoEl = document.createElement('iframe');
    videoEl.src = `https://www.youtube.com/embed/${videoId}`;
    videoEl.loading = 'lazy';
    videoEl.allow =
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    videoEl.allowFullscreen = true;
  }

  // 🎥 Vimeo
  else if (url.includes('vimeo.com')) {
    const videoId = url.split('/').pop();
    videoEl = document.createElement('iframe');
    videoEl.src = `https://player.vimeo.com/video/${videoId}`;
    videoEl.loading = 'lazy';
    videoEl.allow = 'autoplay; fullscreen; picture-in-picture';
    videoEl.allowFullscreen = true;
  }

  // 🎥 MP4 / self-hosted
  else {
    videoEl = document.createElement('video');
    videoEl.src = url;
    videoEl.controls = true;
    videoEl.preload = 'none';
    videoEl.allow =
      'muted; autoplay;loop; playsinline; gyroscope; picture-in-picture';
    videoEl.allowFullscreen = true;
  }

  const wrapper = document.createElement('div');
  wrapper.className = 'video-wrapper';
  wrapper.append(videoEl);
  block.append(wrapper);
}

function getYouTubeId(url) {
  const regExp =
    /(?:youtube\.com\/.*v=|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

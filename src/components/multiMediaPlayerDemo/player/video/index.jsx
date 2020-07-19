import React, { useEffect, useRef } from "react";

import saxAltoVideo from "assets/videos/sax_alto.mp4";

export function Video({ addEventListeners, registerVideo }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref !== null) {
      const { current } = ref;

      registerVideo(current);
      current.load();

      return addEventListeners(current, "video");
    }

    return undefined;
  }, [addEventListeners, ref, registerVideo]);

  return (
    <div className="video-container">
      <div className="video-inner-container">
        <video ref={ref}>
          <source src={saxAltoVideo} />
        </video>
      </div>
    </div>
  );
}

import { Cycle } from "circulator";
import { css } from "emotion";
import { html, render } from "lit-html";
import "./flair.css";
import MirrorWord from "./components/MirrorWord";
import { animateLetter, hideLetter } from "./animate";
import config from "./config";
import { play, of } from "./util";

export const setupAnimation = root => {
  render(
    html`
      <div
        class="Animation ${css`
          flex-grow: 1;
        `}"
      >
        ${config.texts.map(MirrorWord)}
      </div>
    `,
    root
  );

  const setupWord = word => {
    const letters = [...word.querySelectorAll(`.Word-mirror-false .Letter`)];
    const mirrors = [...word.querySelectorAll(`.Word-mirror-true .Letter`)];

    const animation = Animation[of](
      new GroupEffect(
        letters
          .map(
            letter =>
              new SequenceEffect(
                [].concat(
                  config.drop ? animateLetter(letter) : [],
                  config.hide ? hideLetter(letter) : []
                )
              )
          )
          .concat(
            config.mirror
              ? mirrors.map(
                  letter =>
                    new SequenceEffect(
                      [].concat(
                        config.drop ? animateLetter(letter, true) : [],
                        config.hide ? hideLetter(letter, true) : []
                      )
                    )
                )
              : []
          )
      )
    );

    return {
      word,
      letters,
      animation
    };
  };

  const words = [...document.querySelectorAll(`.MirrorWord`)];
  const circularWords = Cycle(words.map(setupWord));

  words.forEach(word => {
    word.style.display = `none`;
    word.style.position = `relative`;
  });

  void (async () => {
    for (const { animation, word } of circularWords) {
      word.style.display = `block`;
      window.playing = animation;
      await animation[play]();
      window.playing = null;
      word.style.display = `none`;
      if (!config.loop) {
        break;
      }
    }
  })();
};

import espeakng_loader, re
from phonemizer.backend.espeak.wrapper import EspeakWrapper
EspeakWrapper.set_library(espeakng_loader.get_library_path()); EspeakWrapper.set_data_path(espeakng_loader.get_data_path())
from phonemizer.backend import EspeakBackend
BE={}
def be(lang):
    if lang not in BE: BE[lang]=EspeakBackend(lang, with_stress=True, preserve_punctuation=True)
    return BE[lang]
def ph(text, lang): return be(lang).phonemize([text])[0]

<?php echo '<?xml version="1.0" encoding="UTF-8"?>'; ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
    @foreach($items as $item)
        <url>
            <loc>{{ $item['uri'] }}</loc>
            <lastmod>{{ $item['lastmod'] }}</lastmod>
            @if(! empty($item['localization']))
				<xhtml:link rel="alternate" hreflang="{{ $item['locale'] }}" href="{{ $item['uri'] }}"/>
				@foreach($item['localization'] as $locItem)
					<xhtml:link rel="alternate" hreflang="{{ $locItem['locale'] }}" href="{{ $locItem['uri'] }}"/>
				@endforeach
            @endif
        </url>
    @endforeach
</urlset>